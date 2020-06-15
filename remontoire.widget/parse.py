#!/usr/bin/env python3
#
# parse a marked up config file (ala Remontoire) and output JSON
#
# config -> [ {'category': str, 'actions': [ { 'action': str, 'keys': str }, ], ]
#
# inspired by https://github.com/regolith-linux/remontoire/blob/master/src/config_parser.vala
#
# TODO
# - handle args, show usage
# - add heuristic to find common configs?
# - parse keys string


import json
import re
import sys

LINE_RE = re.compile(r'^##(?P<category>.*?)//(?P<action>.*?)//(?P<keys>.*?)##.*$')

def readFromFile(filename):
    """Read config from file, return lines."""
    return open(filename, 'r').readlines


def readFromIPC(socket):
    """Read config from IPC via socket, return lines."""
    pass


def parseLine(line):
    m = LINE_RE.match(line)
    if m is None:
        return None
    groups = m.groupdict()
    if any(( i is None for i in groups.values() )):
        return None
    category = groups['category'].strip()
    action = groups['action'].strip()
    keys = groups['keys'].strip()
    # TODO parse keys str
    return (category, action, keys)


def parseConfig(config_iter):
    """Parse lines in config_iter, return tree."""
    catTree = {}
    for line in config_iter():
        parsedItems = parseLine(line)
        if parsedItems is None:
            continue
        (category, action, keys) = parsedItems
        catTree.setdefault(category, []).append({'action': action, 'keys': keys})
   
    # flatten for easier rendering
    catList = []
    for k,v in catTree.items():
      catList.append({'category': k, 'actions': v})
    return catList


if __name__ == "__main__":
    tree = parseConfig(readFromFile(sys.argv[1]))

    #print(json.dumps(tree, indent=4, separators=(',', ': '))) # pretty print
    print(json.dumps(tree))

