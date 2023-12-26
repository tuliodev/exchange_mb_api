import env from './config/env';
import { PgConnection } from '../infra/db/typeorm/helpers';

import 'reflect-metadata';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const app = await (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server running on port ${env.port}`),
    );
  })
  .catch(console.error);
