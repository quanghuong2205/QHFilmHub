export interface IEnv {
  SERVER_URL: string;
}

const DEV: IEnv = {
  SERVER_URL: 'http://localhost:2205',
};

const PRO: IEnv = {
  SERVER_URL: 'https://qhfilmhub.onrender.com',
};

const ENV = {
  DEV,
  PRO,
};

export default ENV['PRO'];
