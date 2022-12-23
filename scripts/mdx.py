import sys
import json

def createArticle(args):
    inputs = json.loads(args[2])
    frontMatter = inputs['frontMatter']
    mdx = inputs['mdx']

    locale = inputs['frontMatter']['locale']
    slug = inputs['frontMatter']['slug']

    path = 'posts/' + locale + '/' + slug + '.mdx'    

    with open(path, 'w') as f:
        f.write('---')
        f.write('\n')
        for key,value in frontMatter.items():
            f.write('%s: %s\n' % (key, value))
        f.write('---')
        f.write('\n')
        f.write(mdx)

createArticle(sys.argv)