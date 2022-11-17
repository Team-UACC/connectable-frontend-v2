import dayjs from 'dayjs';

import { DEFAULT_PROFILE } from '~/constants/images';
import { ArtistComment } from '~/types/artistType';

import Comment from '../Design/Comment';

interface Props {
  comments: Array<ArtistComment>;
}

const ArtistCommentsList = ({ comments }: Props) => {
  return (
    <section className="relative w-full p-[18px] flex flex-col gap-6">
      {comments.map(({ id, nickname, contents, ticketMetadata: { name: ticketName }, writtenAt }) => (
        <Comment
          key={id}
          profileImage={DEFAULT_PROFILE}
          userName={nickname}
          contents={contents}
          additional={ticketName}
          writtenAt={dayjs(writtenAt).format('YYYY.MM.DD HH:mm')}
        />
      ))}
    </section>
  );
};

export default ArtistCommentsList;
