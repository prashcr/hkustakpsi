var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
  .base('appfptn8Rn3LygxRf');

/**
 * GET /brothers
 * Displays active and alumni brothers.
 */
exports.getBrothers = (req, res) => {
  var brothers = [];
  base('Brothers').select({
    // Selecting the first 4 actives:
    maxRecords: 4,
    filterByFormula: 'Status = "Active"',
    view: "All Contacts"
  }).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      brothers.push({
        id: record.id,
        name: record.get('Name'),
        pic: record.get('Pic')
      });
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(error) {
    if (error) {
      console.log(error);
    }

    res.render('brothers', {
      title: 'Brothers',
      brothers
    });
  });
}

/**
 * GET /brother/:id
 * Displays profile of a brother.
 */
exports.getBrother = (req, res) => {
  base('Brothers').find(req.params.id, (err, record) => {
    res.render('brothers/profile', {
      title: 'Profile',
      brother: {
        name: record.get('Name'),
        pic: record.get('Pic'),
        program: record.get('Program of study'),
        intro: record.get('Self-intro'),
        linkedin: record.get('LinkedIn')
      }
    });
  });
}

/**
 * GET /about
 * Displays information about AKPSI and the chapter.
 */
exports.getAbout = (req, res) => {
  res.render('about', {
    title: 'About'
  });
}

/**
 * GET /recruitment
 * Displays information about joining our chapter.
 */
exports.getRecruitment = (req, res) => {
  res.render('recruitment', {
    title: 'Recruitment'
  });
}
