/* eslint-disable import/no-extraneous-dependencies */
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

import { FC } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

export type CodeEditorMode = 'python';
// export type CodeEditorTheme = 'light' | 'dark';
export type CodeEditorTheme = 'light' | 'dark' | 'monokai';

export interface CodeEditorProps extends IAceEditorProps {
  mode?: CodeEditorMode;
  theme?: CodeEditorTheme;
  name?: string;
}

export const CodeEditor: FC<CodeEditorProps> = ({
  name,
  width,
  height,
  value,
  mode = 'python',
  theme = 'monokai',
  ...rest
}: CodeEditorProps) => {
  const editorName = name || Math.random().toString(36).substring(7);
  const editorHeight = height || '300px';
  const editorWidth = width || '100%';

  return (
    <div
      className="code-editor"
      style={{ minHeight: editorHeight, width: editorWidth }}
    >
      <AceEditor
        mode={mode}
        theme={theme}
        name={editorName}
        height={editorHeight}
        width={editorWidth}
        fontSize={14}
        showPrintMargin
        focus
        editorProps={{ $blockScrolling: true }}
        wrapEnabled
        highlightActiveLine
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          showGutter: true,
        }}
        {...rest}
      />
    </div>
  );
};
