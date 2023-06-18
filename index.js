const http = require('http')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { myAPIKey } = require('./config.js')

const argv = yargs(hideBin(process.argv)).argv
const city = argv._[0]
const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`

const wind = {
  'N': 'Северный',
  'S': 'Южный',
  'W': 'Западный',
  'E': 'Восточный',
  'NE': 'Северо-восточный',
  'NW': 'Северо-западный',
  'SE': 'Юго-восточный',
  'SW': 'Юго-западный',
}

http.get(url, (res) => {
  const {statusCode} = res
  if (statusCode !== 200){
    console.log(`statusCode: ${statusCode}`)
    return
  }

  res.setEncoding('utf8')
  let rowData = ''
  res.on('data', (chunk) => rowData += chunk)
  res.on('end', () => {
    let obj = JSON.parse(rowData)
    console.log(
`Погода в: ${city} на ${obj.current.observation_time}
${obj.current.weather_descriptions[0]}
Температура воздуха: ${obj.current.temperature}℃
Ощущается как: ${obj.current.feelslike}℃
Скорость ветра: ${Math.round(obj.current.wind_speed * 10 / 36)} м/с (${obj.current.wind_speed} км/ч)
Направление ветра: ${wind[obj.current.wind_dir] ? wind[obj.current.wind_dir] : obj.current.wind_dir}
Давление: ${Math.round(obj.current.pressure * 0.750062)} мм.рт.ст.
Влажность: ${obj.current.humidity}`
    )
  })
}).on('error', (err) => {
  console.error(err)
})
