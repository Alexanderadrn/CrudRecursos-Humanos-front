import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/rh-app/empleados";

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // esto es como el ngInit
    cargarEmpleados();
  }, []); //se usa ,[] para que solo se llame una vez, o si no se ejecuta de manera infinita

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase); //esto es como el service en el angular es como usar el http
    console.log(resultado.data);
    setEmpleados(resultado.data);
  };
  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`)
    cargarEmpleados();
  }
  return (
    <div className="cintainer">
      <div
        className="container text-center"
        style={{ margin: "30 px", padding: "30px 0" }}
      >
        <h3> Sistema de Recursos Humanos</h3>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            //es como el ngFor
            empleados.map((empleado, indice) => (
              <tr key={indice}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td>
                  <NumericFormat
                    value={empleado.sueldo}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </td>
                <td className="text-center">
                  <div>
                    <Link
                      to={`/editar/${empleado.idEmpleado}`}
                      className="btn btn-primary btn-sm me-3"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
