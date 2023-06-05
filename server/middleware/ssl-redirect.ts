import redirectSSL from 'redirect-ssl';

export default defineEventHandler((event) => {
  redirectSSL.create({ enabled: process.env.NODE_ENV === 'production' });
});
