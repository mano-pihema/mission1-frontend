import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Divider,
} from '@chakra-ui/react'
import { useState } from 'react'
import { fetchSimilarStock } from '../api'
import Car from './Car'
import { CarType } from '../models/car'
import FileInput from './FileInput'

function App() {
  const [prediction, setPrediction] = useState('')
  const [cars, setCars] = useState([])

  function findStock() {
    fetchSimilarStock(prediction)
      .then(({ body }) => setCars(body))
      .catch((err) => console.error(err))
  }
  return (
    <>
      <Container>
        <Heading paddingBottom={4}>Car Checkerer</Heading>
        <FileInput setState={setPrediction} />

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
          {cars && cars.map((car: CarType) => <Car key={car.id} {...car} />)}
        </Stack>
      </Container>
    </>
  )
}

export default App
