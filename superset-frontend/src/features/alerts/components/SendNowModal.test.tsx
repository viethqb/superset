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
import SendNowModal from './SendNowModal';
import { AlertObject, DateOffsetMode } from '../types';

const alert = {
  id: 1,
  name: 'Daily sales',
  extra: { date_offset: { mode: DateOffsetMode.Days, days: 2 } },
} as AlertObject;

const setup = (props = {}) => {
  const onSend = jest.fn();
  const onHide = jest.fn();
  render(
    <SendNowModal
      alert={alert}
      title="report"
      onSend={onSend}
      onHide={onHide}
      {...props}
    />,
  );
  return { onSend, onHide };
};

describe('SendNowModal', () => {
  it('sends with the date offset saved on the report by default', () => {
    const { onSend } = setup();

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(onSend).toHaveBeenCalledWith(alert, {
      mode: DateOffsetMode.Days,
      days: 2,
    });
  });

  it('sends with the date offset picked in the modal', () => {
    const { onSend } = setup();

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(onSend).toHaveBeenCalledWith(alert, {
      mode: DateOffsetMode.Days,
      days: 7,
    });
  });

  it('falls back to the previous business day for reports without config', () => {
    const { onSend } = setup({ alert: { ...alert, extra: undefined } });

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(onSend).toHaveBeenCalledWith(expect.anything(), {
      mode: DateOffsetMode.BusinessDay,
    });
  });
});
