export default function reverseChat(chat) {
    const reverArr = [];
    if (chat.length !== 0) {
      for (let i = chat.length - 1; i >= 0; i -= 1) {
        reverArr.push({
          ...chat[i],
        });
      }
      return reverArr;
    }
    return [];
}