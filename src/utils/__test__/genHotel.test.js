import { genHotel } from '../genHotel';

test('test genHotel', () => {
  const arr = genHotel(10);

  for (const h of arr) {
    expect(h).not.toBeUndefined();
    expect(h.imgs.length).toBeLessThan(5);
    expect(h.imgs.length).toBeGreaterThanOrEqual(1);

    expect(h.tags.length).toBeLessThan(3);
    expect(h.tags.length).toBeGreaterThanOrEqual(0);

    expect(h.price).toBeGreaterThanOrEqual(700);
    expect(h.price).toBeLessThan(7000);

    expect(h.reviews).toBeGreaterThanOrEqual(0);
    expect(h.reviews).toBeLessThan(2001);

    expect(h.distance).toMatch(/[0-9]+\.[0-9]+/);
  }
})
