export function genGuestStr(adult, child, room) {

  let items = [];
  if (adult) {
    if (adult === 1) items.push("1 adult");
    else if (adult > 1) items.push(`${adult} adults`);
  }

  if (child) {
    if (child === 1) items.push("1 child");
    else if (child > 1) items.push(`${child} children`);
  }

  if (room) {
    if (room === 1) items.push("1 room");
    else if (room > 1) items.push(`${room} rooms`);
  }

  return items.join("・");
}