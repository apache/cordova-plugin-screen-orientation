/*
 *
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
 *
*/

/* jshint jasmine: true */

exports.defineAutoTests = function() {
    describe('Orientation Information (window.screen.orientation)', function () {
        it('should exist', function() {
            if (window.screen) {
                expect(window.screen.orientation).toBeDefined();
            } else {
                fail('No screen object is present');
            }
        });

        it('should contain a platform specification that is a string', function() {
            if (window.screen && window.screen.orientation) {
                expect((String(window.screen.orientation.type)).length > 0).toBe(true);
            } else {
                fail('No orientation object is present');
            }
        });
    });

    describe('Screen functions', function () {
        it('should successfully lock and unlock screen orientation', function (done) {
            try {
                window.screen.orientation.lock('landscape').then(function () {
                    expect(window.screen.orientation.unlock).not.toThrow();
                    done();
                }, function (err) {
                    fail('Promise was rejected: ' + err);
                    done();
                });
            } catch (e) {
                fail(e);
                done();
            }
        });
    });
  
  describe('OrientationLockType should have one of seven values', function () {

	it("should have one of seven orientation lock types", function(){
		expect(window.OrientationLockType['portrait-primary']).toBe(1);
		expect(window.OrientationLockType['portrait-secondary']).toBe(2);
		expect(window.OrientationLockType['landscape-primary']).toBe(4);
		expect(window.OrientationLockType['landscape-secondary']).toBe(8);
		expect(window.OrientationLockType['portrait']).toBe(3);
		expect(window.OrientationLockType['landscape']).toBe(12);
		expect(window.OrientationLockType['any']).toBe(15);
		});
   });

};
