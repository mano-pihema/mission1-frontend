import { Box, Input, Image, Button, Stack, Text } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { sendImageToModel } from '../api'

function FileInput({ setState }: { setState: (value: string) => void }) {
  const [image, setImage] = useState<File | undefined>()

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLElement & { files: FileList }
    setImage(target.files[0])
  }

  function submitHandler() {
    sendImageToModel(image).then(({ predictions }) =>
      setState(predictions[0].tagName)
    )
  }

  return (
    <Stack>
      <Box>
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
            <Image objectFit='cover' src={`${URL.createObjectURL(image)}`} />
          ) : (
            <Text paddingY={20} align={'center'}>
              Choose an image
            </Text>
          )}
        </Box>
      </Box>

      <Button colorScheme='teal' onClick={submitHandler}>
        Submit
      </Button>
    </Stack>
  )
}

export default FileInput
