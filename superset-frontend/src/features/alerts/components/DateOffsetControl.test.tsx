/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { fireEvent, render, screen } from 'spec/helpers/testing-library';
import moment from 'moment-timezone';
import DateOffsetControl, { resolveReportDate } from './DateOffsetControl';
import { DateOffsetMode } from '../types';

const resolve = (
  now: string,
  dateOffset?: Parameters<typeof resolveReportDate>[1],
) => resolveReportDate(moment.utc(now), dateOffset).format('YYYY-MM-DD');

describe('resolveReportDate', () => {
  it('falls back to Friday on Sundays and Mondays by default', () => {
    expect(resolve('2026-10-12')).toBe('2026-10-09'); // Monday
    expect(resolve('2026-10-13')).toBe('2026-10-12'); // Tuesday
    expect(resolve('2026-10-17')).toBe('2026-10-16'); // Saturday
    expect(resolve('2026-10-18')).toBe('2026-10-16'); // Sunday
    expect(resolve('2026-10-12', { mode: DateOffsetMode.BusinessDay })).toBe(
      '2026-10-09',
    );
  });

  it('subtracts calendar days without skipping weekends', () => {
    const days = (n: number) =>
      resolve('2026-10-12', { mode: DateOffsetMode.Days, days: n });

    expect(days(0)).toBe('2026-10-12');
    expect(days(1)).toBe('2026-10-11');
    expect(days(30)).toBe('2026-09-12');
  });
});

describe('DateOffsetControl', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    // Monday 10:00 in Asia/Ho_Chi_Minh
    jest.setSystemTime(new Date('2026-10-12T03:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('defaults to the previous business day', () => {
    render(<DateOffsetControl onChange={jest.fn()} />);

    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
    expect(screen.getByTestId('date-offset-preview')).toHaveTextContent(
      'Friday 09/10/2026',
    );
  });

  it('shows and updates the number of days in T-n mode', () => {
    const onChange = jest.fn();
    render(
      <DateOffsetControl
        value={{ mode: DateOffsetMode.Days, days: 2 }}
        onChange={onChange}
      />,
    );

    expect(screen.getByTestId('date-offset-preview')).toHaveTextContent(
      'Saturday 10/10/2026',
    );
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '5' },
    });

    expect(onChange).toHaveBeenCalledWith({
      mode: DateOffsetMode.Days,
      days: 5,
    });
  });
});
