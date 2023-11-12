import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropZone } from './DropZone';

describe('DropZone Component', () => {
  it('renders without errors', () => {
    render(<DropZone />);
    const dropzoneElement = screen.getByTestId('dropzone');
    expect(dropzoneElement).toBeInTheDocument();
  });

  it('accepts and displays dropped images', () => {
    render(<DropZone />);
    const dropzoneElement = screen.getByTestId('dropzone');

    // 仮の画像ファイルを作成
    const imageFile = new File(['(image contents)'], 'example.png', { type: 'image/png' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(imageFile);

    // ドラッグ&ドロップイベントをトリガー
    fireEvent.drop(dropzoneElement, { dataTransfer });

    // 画像が正常に表示されていることを確認
    const previewImage = screen.getByTestId('image-preview');
    expect(previewImage).toBeInTheDocument();
  });

  it('displays reject message on files not .png', () => {
    render(<DropZone />);
    const dropzoneElement = screen.getByTestId('dropzone');

    // 仮のテキストファイルを作成
    const textFile = new File(['(text contents)'], 'example.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(textFile);

    // ドラッグ&ドロップイベントをトリガー
    fireEvent.drop(dropzoneElement, { dataTransfer });

    // リジェクトメッセージが正しく表示されていることを確認
    const rejectMessage = screen.getByRole('p', { name: 'File type must be .png.' });
    expect(rejectMessage).toBeInTheDocument();
  });
  it('displays reject message on files larger than 12MB', () => {
    render(<DropZone />);
    const dropzoneElement = screen.getByTestId('dropzone');

    // 12MBを超える仮のファイルを作成
    const largeFile = new File(['(large contents)'], 'largefile.png', { type: 'image/png' });
    Object.defineProperty(largeFile, 'size', { value: 12 * 1024 * 1024 + 1 });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(largeFile);

    // ドラッグ&ドロップイベントをトリガー
    fireEvent.drop(dropzoneElement, { dataTransfer });

    // リジェクトメッセージが正しく表示されていることを確認
    const rejectMessage = screen.getByRole('p', { name: 'File size must be up to 12MB.' });
    expect(rejectMessage).toBeInTheDocument();
  });
});
