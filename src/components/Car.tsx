import { Card, CardBody, Heading, Stack, Text, Image } from '@chakra-ui/react'
import { CarType } from '../models/car'

function Car({ id, body, image, color, model, brand, year }: CarType) {
  return (
    <>
      <Card key={id} variant={'filled'}>
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_BACKEND_URL}/images/${image}`}
            alt=''
            borderRadius={'lg'}
          />
          <Stack>
            <Heading as='h4' size='lg'>
              {year + ' ' + brand + ' ' + model}
            </Heading>
            <Text>body type: {body}</Text>
            <Text>color: {color}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default Car
