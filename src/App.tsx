import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  Divider,
  Card,
  CardBody,
} from '@chakra-ui/react'
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

  function submitHandler() {
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
      <Container>
        <Heading paddingBottom={4}>Car Checkerer</Heading>
        <Stack>
          <div>
            <Input
              type='file'
              id='myFileInput'
              style={{ display: 'none' }}
              onChange={handleOnChange}
            />
            <Box
              cursor={'pointer'}
              borderWidth='4px'
              borderRadius='lg'
              onClick={() => document.getElementById('myFileInput')?.click()}
              overflow='hidden'
              maxHeight={400}
            >
              {image ? (
                <Image
                  objectFit='cover'
                  src={`${URL.createObjectURL(image)}`}
                />
              ) : (
                <Text paddingY={20} align={'center'}>
                  Choose an image
                </Text>
              )}
            </Box>
          </div>

          <Button colorScheme='teal' onClick={submitHandler}>
            Submit
          </Button>
        </Stack>

        <Divider
          variant={'solid'}
          colorScheme='teal'
          orientation='horizontal'
        />

        <Box display={'flex'} justifyContent={'space-between'} paddingY={10}>
          <Heading as='h3' size='lg'>
            Prediction: {prediction}
          </Heading>
          {prediction && (
            <Button onClick={findStock}> find similar stock</Button>
          )}
        </Box>
        <Stack spacing={4}>
          {cars &&
            cars.map(({ id, body, image, color, model, brand, year }) => (
              <Card key={id} variant={'filled'}>
                <CardBody>
                  <Image src={`${backendURL}/images/${image}`} alt='' />
                  <Stack>
                    <Heading as='h4' size='lg'>
                      {year + ' ' + brand + ' ' + model}
                    </Heading>
                    <Text>body type: {body}</Text>
                    <Text>color: {color}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
        </Stack>
      </Container>
    </>
  )
}

export default App
