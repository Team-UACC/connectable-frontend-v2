import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { createArtistComment } from '~/apis/artists';
import mutationKeys from '~/constants/mutationKeys';
import queryKeys from '~/constants/queryKeys';

export default function useArtistCommentMutation(
  artistId: number,
  options?: Pick<UseMutationOptions<void, AxiosError, string>, 'onSuccess'>
) {
  const queryClient = useQueryClient();

  return useMutation(
    mutationKeys.artist.comment(artistId),
    (comments: string) => createArtistComment(artistId, comments),
    {
      onSuccess: (...props) => {
        queryClient.invalidateQueries(queryKeys.artist.comment(artistId));
        toast.success('방명록을 작성했어요.');

        options?.onSuccess && options.onSuccess(...props);
      },
      onError: () => {
        toast.error('네트워크 에러로 방명록 작성에 실패했어요.');
      },
    }
  );
}
