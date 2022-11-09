import { useRef } from 'react';

import { createArtistComment } from '~/apis/artists';
import useArtistCommentById from '~/hooks/apis/useArtistCommentById';

import TextAreaForm from '../Design/TextAreaForm';

import ArtistCommentsList from './ArtistCommentsList';

interface Props {
  id: number;
}

const ArtistCommentsContainer = ({ id }: Props) => {
  const { data: comments } = useArtistCommentById(id);

  const commentAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!commentAreaRef.current) return;

    const { value } = commentAreaRef.current;

    if (value) createArtistComment(id, value);
  };

  return (
    <div>
      <div className="p-[18px]">
        <TextAreaForm handleSubmit={handleSubmit} ref={commentAreaRef} />
      </div>
      <ArtistCommentsList comments={comments ?? []} />
    </div>
  );
};

export default ArtistCommentsContainer;
