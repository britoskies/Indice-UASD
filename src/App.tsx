import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap
import { Alert, Button, Form } from "react-bootstrap";

function App() {
  const [credit, setCredit] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [credits, setCredits] = React.useState<number[]>([]);
  const [scores, setScores] = React.useState<number[]>([]);
  const [show, setShow] = React.useState<boolean>(false);
  const [total, setTotal] = React.useState<number>(0);

  const add = (type: string, value: number) => {
    if (type === "credits") {
      if (credit > 9 || credit < 1)
        return alert("Excediste el máximo o mínimo de créditos");
      setCredits([...credits, value]);
    } else {
      if (score > 999 || score < 1)
        return alert("Excediste el máximo o mínimo de puntaje");
      setScores([...scores, value]);
    }
    setShow(true);
  };

  const calculate = (e: any): void => {
    e.preventDefault();
    setShow(false);
    const totalCredits = credits.reduce((a, b) => a + b);
    const totalScore = scores.reduce((a, b) => a + b);
    setTotal(parseInt((totalScore / totalCredits).toFixed(2)));
  };

  return (
    <div className="App">
      <header className="App-header row m-0">
        <h1 className="my-5"> Calcula tu Indice </h1>
        <Form method="get" onSubmit={(e) => calculate(e)} className="col-4 min-w">
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label className="fs-5">Créditos</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                id="credit-input"
                type="number"
                max={9}
                min={1}
                placeholder="Introduce cada crédito (uno por uno)"
                onChange={(e) => setCredit(parseInt(e.target.value))}
              />
              <Button variant="primary" onClick={() => add("credits", credit)}>
                Agregar
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
            <Form.Label className="fs-5">Puntajes</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                max={999}
                min={1}
                placeholder="Introduce cada puntaje (uno por uno)"
                onChange={(e) => setScore(parseInt(e.target.value))}
              />
              <Button variant="primary" onClick={() => add("scores", score)}>
                Agregar
              </Button>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Calcular
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => setShow(!show)}
            className="w-100 mt-3"
          >
            {show === false ? "Mostrar tabla" : "Cerrar tabla"}
          </Button>
        </Form>

        {total > 0 && (
          <Alert variant="primary" className="col-4 my-5">
            <h5 className="fw-bold">Promedio</h5> {total}
            <hr />
            <Form method="get">
              <Button type="submit" variant="outline-primary">
                Reiniciar
              </Button>
            </Form>
          </Alert>
        )}

        <Alert show={show} variant="primary" className="col-2 my-5 min-w">
          <div className="d-flex justify-content-center gap-5">
            <section className="d-flex flex-column justify-content-start align-items-center">
              <h5 className="fw-bold">Créditos</h5>
              <div className="col-2">{credits.join(" ")}</div>
            </section>
            <section className="d-flex flex-column justify-content-start align-items-center">
              <h5 className="fw-bold">Puntajes</h5>
              <div className="col-4">{scores.join(" ")} </div>
            </section>
          </div>
          <hr />
          <div className="d-flex justify-content-end gap-2">
            <Button
              onClick={() => {
                setCredits([]);
                setScores([]);
                setTotal(0);
              }}
              variant="outline-primary"
              className="w-100"
            >
              Reiniciar
            </Button>
            <Button
              onClick={() => setShow(false)}
              variant="outline-danger"
              className="w-100"
            >
              Cerrar
            </Button>
          </div>
        </Alert>
      </header>
    </div>
  );
}

export default App;
