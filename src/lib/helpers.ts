import fs from 'fs';

import type { MappingRange } from './types';

export function getFileContent(file: Buffer | string): string {
  const buffer = Buffer.isBuffer(file) ? file : fs.readFileSync(file);

  return buffer.toString();
}

const BYTE_SIZES = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
// Bytes
const SIZE_BASE = 1024;

/**
 * Format number of bytes as string
 * Source @see https://stackoverflow.com/a/18650828/388951
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return `0 ${BYTE_SIZES[0]}`;

  const exponent = Math.floor(Math.log(bytes) / Math.log(SIZE_BASE));
  const value = bytes / Math.pow(SIZE_BASE, exponent);

  // `parseFloat` removes trailing zero
  return `${parseFloat(value.toFixed(decimals))} ${BYTE_SIZES[exponent]}`;
}

export function formatPercent(value: number, total: number, fractionDigits?: number): string {
  return ((100.0 * value) / total).toFixed(fractionDigits);
}

const PATH_SEPARATOR_REGEX = /(\/)/;

/**
 * Find common path prefix
 * Source @see http://stackoverflow.com/a/1917041/388951
 * @param paths List of filenames
 */
export function getCommonPathPrefix(paths: string[]): string {
  if (paths.length < 2) return '';

  const A = paths.concat().sort();
  const a1 = A[0].split(PATH_SEPARATOR_REGEX);
  const a2 = A[A.length - 1].split(PATH_SEPARATOR_REGEX);
  const L = a1.length;

  let i = 0;

  while (i < L && a1[i] === a2[i]) i++;

  return a1.slice(0, i).join('');
}

export function getFirstRegexMatch(regex: RegExp, string: string): string | null {
  const match = string.match(regex);

  return match ? match[0] : null;
}

const LF = '\n';
const CR_LF = '\r\n';

type SplitLine = { line: string; eol: string };

export function splitLinesByEOL(content: string): SplitLine[] {
  return content.split(CR_LF).reduce<SplitLine[]>(
    (arr, e, i, { length }) =>
      arr.concat(
        e.split(LF).map((line, j, orig) => ({
          line,
          eol: j < orig.length - 1 || i === length - 1 ? LF : CR_LF,
        }))
      ),
    []
  );
}

/**
 * Get `subString` occurrences count in `string`
 */
export function getOccurrencesCount(subString: string, string: string): number {
  let count = 0;
  let position = string.indexOf(subString);
  const subStringLength = subString.length;

  while (position !== -1) {
    count += 1;
    position = string.indexOf(subString, position + subStringLength);
  }

  return count;
}

export function isEOLAtPosition(string: string, [line, column]: [number, number]): boolean {
  let lineOffset = 0;

  for (let lineIndex = 1; lineIndex < line; lineIndex += 1) {
    const lineOffsetCrlf = string.indexOf(CR_LF, lineOffset);
    const lineOffsetLf = string.indexOf(LF, lineOffset);

    if (lineOffsetCrlf === -1 && lineOffsetLf === -1) {
      return false;
    } else if (lineOffsetCrlf === -1) {
      lineOffset = lineOffsetLf;
    } else if (lineOffsetLf === -1) {
      lineOffset = lineOffsetCrlf;
    } else {
      lineOffset = Math.min(lineOffsetCrlf, lineOffsetLf);
    }

    lineOffset += (lineOffset === lineOffsetCrlf ? CR_LF : LF).length;
  }

  return (
    string.substr(lineOffset + column, CR_LF.length) === CR_LF ||
    string.substr(lineOffset + column, LF.length) === LF
  );
}

/**
 * Merge consecutive ranges with the same source
 */
export function mergeRanges(ranges: MappingRange[]): MappingRange[] {
  const mergedRanges: MappingRange[] = [];
  const rangesCount = ranges.length;

  if (rangesCount === 1) {
    return ranges;
  }

  let { start, end, source } = ranges[0];

  for (let i = 1; i < rangesCount; i += 1) {
    const isSourceMatch = ranges[i].source === ranges[i - 1].source;
    const isConsecutive = ranges[i].start - ranges[i - 1].end === 1;

    if (isSourceMatch && isConsecutive) {
      end = ranges[i].end;
    } else {
      mergedRanges.push({ start, end, source });

      ({ start, end, source } = ranges[i]);
    }
  }

  mergedRanges.push({ start, end, source });

  return mergedRanges;
}
