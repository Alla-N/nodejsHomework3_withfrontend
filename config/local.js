module.exports = {
  'webServer': {
    'protocol': 'http',
    'host': 'localhost',
    'port': 8000,
    'logsPath': 'data/requestLogs.json',
  },
  'dataBase': {
    'protocol': 'mongodb',
    'host': 'localhost',
    'port': 27017,
    'name': 'uber_app',
  },
  'JWT': {
    'secret': 'jwtSecretCode',
  },
};
