import { colors } from '../../../src/constants/colors';
import { getColor } from '../../../src/utils/getColors';

describe('test getColors', () => {
  it('Should return color hex by type', () => {
    const color = getColor([
      {
        type: {
          name: 'poison',
        },
      },
    ]);
    expect(color).toBe(colors.poison);
  });

  it('Should return normal color', () => {
    const color = getColor([]);
    expect(color).toBe(`${colors.normal}99`);
  });
});
