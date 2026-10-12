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
import { useState } from 'react';
import { t } from '@superset-ui/core';
import Modal from 'src/components/Modal';
import { StyledInputContainer } from '../AlertReportModal';
import { AlertObject, DateOffset } from '../types';
import DateOffsetControl, { DEFAULT_DATE_OFFSET } from './DateOffsetControl';

interface SendNowModalProps {
  alert: AlertObject;
  title: string;
  onHide: () => void;
  onSend: (alert: AlertObject, dateOffset: DateOffset) => void;
}

export default function SendNowModal({
  alert,
  title,
  onHide,
  onSend,
}: SendNowModalProps) {
  // Starts from the saved config, changes only apply to this one send
  const [dateOffset, setDateOffset] = useState<DateOffset>(
    alert.extra?.date_offset ?? DEFAULT_DATE_OFFSET,
  );

  return (
    <Modal
      show
      name="send-now-modal"
      title={t('Send %s "%s" now', title, alert.name)}
      onHide={onHide}
      onHandledPrimaryAction={() => onSend(alert, dateOffset)}
      primaryButtonName={t('Send')}
      width="500px"
      centered
    >
      <StyledInputContainer>
        <div className="control-label">{t('Date in email')}</div>
        <DateOffsetControl value={dateOffset} onChange={setDateOffset} />
        <div className="helper">
          {t('Applies to this send only, the saved setting is not changed.')}
        </div>
      </StyledInputContainer>
    </Modal>
  );
}
