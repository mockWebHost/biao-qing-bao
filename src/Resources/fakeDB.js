
import wo from './我.png';
import shi from './是.png';
import zhu from './猪 楷.png';
import zhu2 from './猪 草.png';
import zhuemoji from './猪 emoji.jpeg';

const fakeDb = {
    "我": {
        word: [wo],
        emoji: []
    },
    "是": {
        word: [shi],
        emoji: []
    },
    "猪": {
        word: [zhu, zhu2],
        emoji: [zhuemoji]
    }
}


export const findImagesListByWordAndMode = (letter, mode) => {
    if (!fakeDb.hasOwnProperty(letter)) {
        return [];
    }
    const { word, emoji } = fakeDb[letter];

    return mode === 'mix' ? word.concat(emoji) : word;
}