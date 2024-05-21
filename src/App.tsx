import { FormEvent, useState } from 'react'
import superagent from 'superagent'

function App() {
  const [image, setImage] = useState<File | undefined>()
  const [prediction, setPrediction] = useState('')
  const [cars, setCars] = useState([])
  const backendURL = `${import.meta.env.VITE_BACKEND_URL}`

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLElement & { files: FileList }
    setImage(target.files[0])
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault()

    superagent
      .post(`${import.meta.env.VITE_CUSTOM_VISION_MODEL}`)
      .set('Prediction-Key', `${import.meta.env.VITE_PREDICTION_KEY}`)
      .set('Content-Type', 'application/octet-stream')
      .send(image)
      .then(({ body }) => setPrediction(body.predictions[0].tagName))
      .catch((err) => console.error(err))
  }

  function findStock() {
    superagent
      .post(backendURL)
      .send({ car: prediction })
      .then(({ body }) => setCars(body))
      .catch((err) => console.error(err))
  }
  return (
    <>
      <h1>Car Checker</h1>
      <form onSubmit={submitHandler}>
        <input type='file' name='imageUpload' onChange={handleOnChange} />
        <button>submit</button>
      </form>
      {image && <img width={200} src={`${URL.createObjectURL(image)}`} />}
      <p>prediction: {prediction}</p>
      {prediction && <button onClick={findStock}> find similar stock</button>}

      {cars &&
        cars.map(({ id, body, image }) => (
          <div key={id}>
            <p>body type: {body}</p>
            <img src={`${backendURL}/images/${image}`} alt='' />
          </div>
        ))}
    </>
  )
}

export default App
