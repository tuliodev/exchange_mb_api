import { Controller, HttpRequest } from '../../../presentation/protocols';
import { Request as ExpressRequest, Response } from 'express';

export interface Request extends ExpressRequest {
  file: File;
}

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
