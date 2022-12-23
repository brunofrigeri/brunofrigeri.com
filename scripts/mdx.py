import sys
import json

def runMDXFile(args):
    inputs = json.loads(args[2])
    print("New file was created with: ", inputs)

runMDXFile(sys.argv)