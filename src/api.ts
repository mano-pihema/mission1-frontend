import superagent from "superagent";

export function sendImageToModel(image:File | undefined) {
  return superagent
      .post(`${import.meta.env.VITE_CUSTOM_VISION_MODEL}`)
      .set('Prediction-Key', `${import.meta.env.VITE_PREDICTION_KEY}`)
      .set('Content-Type', 'application/octet-stream')
      .send(image)
      .then((res) =>res.body )
      .catch((err) => console.error(err))
}

export function fetchSimilarStock(prediction:string) {
  return superagent
  .post(`${import.meta.env.VITE_BACKEND_URL}`)
  .send({ car: prediction })
}