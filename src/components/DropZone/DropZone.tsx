import { useState } from 'react';
import { Group, Text, rem, SimpleGrid, Image, Center, Box } from '@mantine/core';
import { Dropzone, type DropzoneProps, type FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import classes from './DropZone.module.css';

export function DropZone(props: Partial<DropzoneProps>) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [message, setMessage] = useState('');

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        id="image-preview"
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const rejectMessage = () => {
    let errorMessage = '';
    if (message === 'file-too-large') {
      errorMessage = 'File size must be up to 12MB.';
    } else if (message === 'file-invalid-type') {
      errorMessage = 'File type must be .png.';
    }
    return errorMessage ? (
      <Center>
        <Text size="xl" c="red.6">
          {errorMessage}
        </Text>
      </Center>
    ) : null;
  };

  return (
    <>
      <Box className={classes.dropzonewrapper}>
        <Dropzone
          onDrop={(acceptedFiles) => {
            setMessage('');
            setFiles(acceptedFiles);
          }}
          onReject={(rejectredFiles) => {
            console.log(rejectredFiles);
            setFiles([]);
            setMessage(rejectredFiles[0].errors[0].code);
          }}
          maxSize={12 * 1024 * 1024} // max 12MB
          accept={['image/png']}
          id="dropzone"
          {...props}
        >
          <Group justify="center" gap="xl" mih={10} style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Center inline>
                <IconX
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                  stroke={1.5}
                />
                <Text size="xl" inline>
                  Can't choose this image.
                </Text>
              </Center>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Center inline>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: 'var(--mantine-color-dimmed)',
                    paddingRight: '1rem',
                  }}
                  stroke={1.5}
                />
                <Text size="xl" inline>
                  Drag a image here
                </Text>
              </Center>
            </Dropzone.Idle>
          </Group>
          {rejectMessage()}
          <SimpleGrid className={classes.thumbnail} mt={previews.length > 0 ? 'xl' : 0}>
            {previews}
          </SimpleGrid>
        </Dropzone>
      </Box>
    </>
  );
}
