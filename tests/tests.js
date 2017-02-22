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

    describe('window.screen', function() {

        it('should be defined', function() {
            expect(window.screen).toBeDefined();
        });
    });

    describe('window.screen.orientation', function() {

        it('should be defined', function() {
            expect(window.screen.orientation).toBeDefined();
        });

        it('should have a `lock` function', function() {
            expect(window.screen.orientation.lock).toBeDefined();
            expect(typeof window.screen.orientation.lock).toBe('function');
        });

        it('should have an `unlock` function', function() {
            expect(window.screen.orientation.unlock).toBeDefined();
            expect(typeof window.screen.orientation.unlock).toBe('function');
        });

        it('should have a `type` property (string)', function() {
            expect(window.screen.orientation.type).toBeDefined();
            expect(typeof window.screen.orientation.type).toBe('string');
        });

        xit('should have an `angle` property (number)', function() {
            expect(window.screen.orientation.angle).toBeDefined();
            expect(typeof window.screen.orientation.angle).toBe('number');
        });

        xit('should have an `onchange` property (function)', function() {
            expect(window.screen.orientation.onchange).toBeDefined();
            expect(typeof window.screen.orientation.onchange).toBe('function');
        });
    });

    describe('OrientationType', function() {

        it("should be defined", function() {
            expect(window.OrientationType).toBeDefined();
        });

        xit("should have defined types", function(){
            expect(window.OrientationType['portrait-primary']).toBeDefined();
            expect(window.OrientationType['portrait-secondary']).toBeDefined();
            expect(window.OrientationType['landscape-primary']).toBeDefined();
            expect(window.OrientationType['landscape-secondary']).toBeDefined();
        });
    });

    describe('OrientationLockType', function() {

        it("should be defined", function() {
            expect(window.OrientationLockType).toBeDefined();
        });

        it("should have defined types", function(){
            expect(window.OrientationLockType['portrait-primary']).toBeDefined();
            expect(window.OrientationLockType['portrait-secondary']).toBeDefined();
            expect(window.OrientationLockType['landscape-primary']).toBeDefined();
            expect(window.OrientationLockType['landscape-secondary']).toBeDefined();
            expect(window.OrientationLockType['portrait']).toBeDefined();
            expect(window.OrientationLockType['landscape']).toBeDefined();
            expect(window.OrientationLockType['any']).toBeDefined();
        });
    });


    // TODO:
    // test addEventListener('change') works
    // test onchange works
    describe('window.screen.orientation', function() {

        xit('should successfully lock and unlock screen orientation, lock should return a promise', function(done) {
            try {
                var promise = window.screen.orientation.lock('landscape');
                expect(promise).toBeDefined();
                expect(typeof promise).toBe('promise');

                promise.then(function() {
                    expect(window.screen.orientation.unlock).not.toThrow();
                    done();
                }, function(err) {
                    expect(err).toBeDefined();
                    fail(err);
                    done();
                });
            } catch (err) {
                fail(err);
                done();
            }
        });
    });
};
