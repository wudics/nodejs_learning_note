var tcppkg = {
    
    read_pkg_size: function(pkg_data, offset) {
        if (offset > pkg_data.length - 2) {
            return -1;
        }

        return pkg_data.readUInt16LE(offset);
    },

    pack: function(data) {
        var buf = Buffer.allocUnsafe(2 + data.length);
        buf.writeUInt16LE(2 + data.length, 0);
        buf.fill(data, 2);
        return buf;
    },

    unpack: function(client, data) {

        var pkg_set = [];

        if (client.last_pkg == undefined) client.last_pkg = null;

        // check client.last_pkg, concat if it has some data before.
        if (client.last_pkg != null) {
            client.last_pkg = Buffer.concat([client.last_pkg, data], client.last_pkg.length + data.length);
        } else {
            client.last_pkg = data;
        }

        var offset = 0;
        var pkg_len = this.read_pkg_size(client.last_pkg, offset);

        // headers < 2 bytes, can not handle, return
        if (pkg_len < 0) {
            return;
        }

        while (offset + pkg_len <= client.last_pkg.length) {
            var pkg_buf = Buffer.allocUnsafe(pkg_len - 2);
            client.last_pkg.copy(pkg_buf, 0, offset + 2, offset + pkg_len);

            // unpack 1 data buffer
            // do some dispatch things...
            // console.log(pkg_buf.toString());
            pkg_set.push(pkg_buf);

            offset = offset + pkg_len;
            if (offset >= client.last_pkg.length) {
                break;
            }
            
            pkg_len = this.read_pkg_size(client.last_pkg, offset);
            if (pkg_len < 0) {
                break;
            }
        }

        // reset or save remain buffer
        if (offset >= client.last_pkg.length) {
            client.last_pkg = null;
        } else {
            var remain_buf = Buffer.allocUnsafe(client.last_pkg.length - offset);
            client.last_pkg.copy(remain_buf, 0, offset, client.last_pkg.length);
            client.last_pkg = remain_buf;
        }

        return pkg_set;
    }
};

module.exports = tcppkg;