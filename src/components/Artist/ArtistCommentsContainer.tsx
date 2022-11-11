import { useRef } from 'react';
import { useQuery } from 'react-query';

import { fetchIsArtistNftOwner } from '~/apis/artists';
import useArtistCommentMutation from '~/hooks/apis/useArtistCommentMutation';
import useArtistCommentById from '~/hooks/apis/useArtistCommentQuery';

import TextAreaForm from '../Design/TextAreaForm';

import ArtistCommentsList from './ArtistCommentsList';

interface Props {
  id: number;
}

const ArtistCommentsContainer = ({ id }: Props) => {
  const { data: comments } = useArtistCommentById(id);
  const { data: isHolderData } = useQuery(['isHolder', id], () => fetchIsArtistNftOwner(1));

  const { mutate, isLoading } = useArtistCommentMutation(id, {
    onSuccess: () => {
      if (commentAreaRef.current) commentAreaRef.current.value = '';
    },
  });

  const commentAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!commentAreaRef.current) return;

    const { value } = commentAreaRef.current;

    if (value) {
      mutate(value);
    }
  };

  return (
    <div>
      <div className="p-[18px]">
        <TextAreaForm
          handleSubmit={handleSubmit}
          disabled={!isHolderData?.isNftHolder || isLoading}
          placeholder={isHolderData?.isNftHolder ? undefined : 'NFT 보유자만 작성할 수 있어요.'}
          ref={commentAreaRef}
        />
      </div>
      <ArtistCommentsList comments={comments ?? []} />
    </div>
  );
};

export default ArtistCommentsContainer;
