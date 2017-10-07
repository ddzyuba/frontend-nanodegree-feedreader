/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all URLs are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all names are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function() {
        /* Test ensures the menu element is
         * hidden by default.
         */
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('menu is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* Test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu toggles on click', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* Test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least 1 entry element after loadFeed() is done', function(done) {
            var entryQuantity = $('.feed .entry').length;
            expect(entryQuantity).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {
        /* Test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var firstFeedSelection;
        var secondFeedSelection;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeedSelection = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('content changes after calling loadFeed()', function(done) {
            secondFeedSelection = $('.feed').html();
            expect(secondFeedSelection).not.toBe(firstFeedSelection);
            done();
        });

    });
}());
