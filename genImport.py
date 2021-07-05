if __name__ == "__main__":

    with open("./picList.txt") as fd:
        prefix = "../assets/images/"
        out = open("./outPicList.js", "w")
        pics = fd.readlines();
        pics = map(lambda x: x.strip(), pics)
        for line in pics:
            out.write("import %s from \"%s%s.jpg\";\n" % (line, prefix, line))

        out.write("export { %s }\n" % ",".join(pics))
        out.close()
        fd.close()
            
