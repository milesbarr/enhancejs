#!/bin/bash

echo -e '"use strict";\n' > enhance.js
find components -name "*.js" -exec sh -c 'cat "$1"; echo' _ {} \; >> enhance.js
