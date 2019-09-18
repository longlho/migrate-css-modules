import * as ts from 'typescript'
import * as postcss from 'postcss'
import * as postcssModules from 'postcss-modules'
import * as path from 'path'
import {outputJSONSync, readFile} from 'fs-extra'
import {sync as globSync} from 'glob'

export interface Opts {
    cssPathPattern: string
    srcPathPattern: string
}

export async function compile (opts: Opts) {
    const allClassNames = {}
    const postcssCompiler = postcss([
        postcssModules({
            getJSON: function(cssFileName, json) {
                allClassNames[cssFileName] = json
              }
        })
    ])

    const cssFilePaths = globSync(opts.cssPathPattern)
    console.log(`Compiling: 
${cssFilePaths.join('\n')}
`)
    await cssFilePaths.map(fn => 
        readFile(fn).then(css => 
            postcssCompiler.process(css, {
                from: fn,
            })
        )
    )

    const tsFilePaths = globSync(opts.srcPathPattern)
}