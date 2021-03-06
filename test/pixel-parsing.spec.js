// @flow
import { calculateBox, type BoxModel, type Spacing } from '../src';
import mock, { getStyles } from './mock';

it('should parse integer pixel values', () => {
  const styles = getStyles(mock.padding, mock.border, mock.margin);
  const box: BoxModel = calculateBox(mock.borderBox, styles);

  expect(box.padding).toEqual(mock.padding);
  expect(box.border).toEqual(mock.border);
  expect(box.margin).toEqual(mock.margin);
});

it('should parse double pixel values', () => {
  const padding: Spacing = {
    top: 12.004,
    right: 10.3,
    bottom: 100.23,
    left: -19.23,
  };

  const styles = getStyles(padding, mock.border, mock.margin);
  const box: BoxModel = calculateBox(mock.borderBox, styles);

  expect(box.padding).toEqual(padding);
});

it('should throw if not receiving a pixel value', () => {
  const styles = getStyles(mock.padding, mock.border, mock.margin);
  styles.paddingTop = '100em';

  expect(() => calculateBox(mock.borderBox, styles)).toThrow(
    'Expected value to be a pixel value',
  );
});

it('should throw if receiving a malformed value', () => {
  const styles = getStyles(mock.padding, mock.border, mock.margin);
  styles.paddingTop = '100.00.1px';

  expect(() => calculateBox(mock.borderBox, styles)).toThrow(
    'Could not parse value',
  );
});
