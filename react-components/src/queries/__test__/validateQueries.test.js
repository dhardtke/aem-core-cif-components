/*******************************************************************************
 *
 *    Copyright 2019 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/

// This is used to validate the queries against the Magento GraphQL schema
import { buildClientSchema, parse, validate } from 'graphql';
import magentoSchema from './magento-schema-2.3.5.json';
let schema = buildClientSchema(magentoSchema.data);

import fs from 'fs';
import path from 'path';

describe('Validate all GraphQL queries against Magento schema', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('validate all queries', () => {
        let files = fs.readdirSync(path.join(__dirname, '..')); // eslint-disable-line
        files
            .filter(file => file.endsWith('.graphql'))
            .forEach(file => {
                console.log('Validating ' + file);
                let query = fs.readFileSync(path.join(__dirname, '..', file), 'UTF-8'); // eslint-disable-line
                let errors = validate(schema, parse(query));
                expect(errors).toHaveLength(0);
            });
    });
});