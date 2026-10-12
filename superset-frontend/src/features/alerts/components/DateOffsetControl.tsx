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
import { styled, t } from '@superset-ui/core';
import moment, { Moment } from 'moment-timezone';
import { Select } from 'src/components';
import { InputNumber } from 'src/components/Input';
import { DateOffset, DateOffsetMode } from '../types';

// Must match the timezone and limits the backend resolves the date with
const REPORT_DATE_TIMEZONE = 'Asia/Ho_Chi_Minh';
const PREVIEW_FORMAT = 'dddd DD/MM/YYYY';
export const MAX_OFFSET_DAYS = 365;

export const DEFAULT_DATE_OFFSET: DateOffset = {
  mode: DateOffsetMode.BusinessDay,
};

const DaysRow = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    gap: ${theme.gridUnit * 2}px;
    margin-top: ${theme.gridUnit * 2}px;
  `}
`;

const MONDAY = 1;
const SUNDAY = 0;

const MODE_OPTIONS = [
  {
    label: t('Previous business day (T-1, Sunday T-2, Monday T-3)'),
    value: DateOffsetMode.BusinessDay,
  },
  {
    label: t('T-n (calendar days)'),
    value: DateOffsetMode.Days,
  },
];

export function resolveReportDate(now: Moment, dateOffset?: DateOffset) {
  if (dateOffset?.mode === DateOffsetMode.Days) {
    return now.clone().subtract(dateOffset.days ?? 0, 'days');
  }
  const weekday = now.day();
  if (weekday === MONDAY) {
    return now.clone().subtract(3, 'days');
  }
  if (weekday === SUNDAY) {
    return now.clone().subtract(2, 'days');
  }
  return now.clone().subtract(1, 'days');
}

interface DateOffsetControlProps {
  value?: DateOffset;
  onChange: (value: DateOffset) => void;
}

export default function DateOffsetControl({
  value = DEFAULT_DATE_OFFSET,
  onChange,
}: DateOffsetControlProps) {
  const onModeChange = (mode: DateOffsetMode) =>
    onChange(
      mode === DateOffsetMode.Days
        ? { mode, days: value.days ?? 1 }
        : DEFAULT_DATE_OFFSET,
    );

  const onDaysChange = (days?: number | string | null) => {
    const parsed = Math.trunc(Number(days));
    if (
      days === null ||
      days === undefined ||
      days === '' ||
      Number.isNaN(parsed)
    ) {
      return;
    }
    onChange({
      mode: DateOffsetMode.Days,
      days: Math.min(Math.max(parsed, 0), MAX_OFFSET_DAYS),
    });
  };

  const preview = resolveReportDate(
    moment.tz(REPORT_DATE_TIMEZONE),
    value,
  ).format(PREVIEW_FORMAT);

  return (
    <>
      <div className="input-container">
        <Select
          ariaLabel={t('Date in email')}
          onChange={onModeChange}
          value={value.mode}
          options={MODE_OPTIONS}
        />
      </div>
      {value.mode === DateOffsetMode.Days && (
        <DaysRow>
          <span>T -</span>
          <InputNumber
            aria-label={t('Number of days before the send date')}
            min={0}
            max={MAX_OFFSET_DAYS}
            precision={0}
            value={value.days ?? 1}
            onChange={onDaysChange}
          />
          <span>{t('days')}</span>
        </DaysRow>
      )}
      <div className="helper" data-test="date-offset-preview">
        {t(
          'Date formats in the subject and description resolve to %s if sent now.',
          preview,
        )}
      </div>
    </>
  );
}
