import sys,json

def runMDXFile(args):
    inputs = json.loads(args)
    print("New file was created with: ", inputs)

runMDXFile(sys.argv[1])