var assert = require('assert')
  , timer = require(__dirname + '/timers').timer
  , exec = require('child_process').exec
  , $p = require(__dirname + '/..')

exec('echo && echo pass', function(err, output) {
  if(err) { throw err }
  assert.equal('pass', output.trim())

  var t = timer()
  $p('echo').and('echo pass')
    .data(function(err, output) {
      t.stop()
			assert(!err, 'Did not expect any error')
      assert.equal('pass', output.toString().trim())
    })
})

exec('fail || echo pass', function(err, output) {
  if(err) { throw err }
  assert.equal('pass', output.trim())

  var t = timer()
  $p('fail')
		.data(function(err, output) {
			assert(err, 'Expected an error')
		}).or('echo pass')
    	.data(function(err, output) {
	      t.stop()
				assert(!err, 'Did not expect any error')
	      assert.equal('pass', output.toString().trim())
	    })
})

exec('fail; echo pass', function(err, output) {
  if(err) { throw err }
  assert.equal('pass', output.trim())

  var t = timer()
  $p('fail')
		.data(function(err, output) {
			assert(err, 'Expected an error')
		}).then('echo pass')
	    .data(function(err, output) {
	      t.stop()
				assert(!err, 'Did not expect any error')
	      assert.equal('pass', output.toString().trim())
	    })
})

exec('echo && echo pass && echo pass2', function(err, output) {
  if(err) { throw err }
  // assert.equal('pass2', output.trim())

  var t = timer()
  $p('echo')
    .and('echo pass')
    .and('echo pass2')
      .data(function(err, output) {
        t.stop()
				assert(!err, 'Did not expect any error')
        assert.equal('pass2', output.trim())
      })
})

exec('fail || echo pass && echo pass2', function(err, output) {
  if(err) { throw err }
  // assert.equal('pass2', output.trim())

  var t = timer()
  $p('fail').data(function(err, output) {
		assert(err, 'Expected an error')
	})
    .or('echo pass')
    .and('echo pass2')
      .data(function(err, output) {
        t.stop()
				assert(!err, 'Did not expect any error')
        assert.equal('pass2', output.toString().trim())
      })
})
