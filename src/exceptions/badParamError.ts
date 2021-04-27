export default class BadParamError extends Error {
  constructor(param: string | string[]) {
    let message: string;

    if(Array.isArray(param)) {
      let validParams: string = param.join(', ');
      message = `Los parametros ingresados son incorrectos, los parametros validos son: ${validParams}`;
    } else {
      message = `Se ingreso el parametro ${param} sin valor asociado`;
    }

    super(message);
  }
} 