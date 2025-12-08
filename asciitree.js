/**
 * (c) 2014 Anton Medvedev
 *
 *       SELECT_________________
 *      /            \          \
 *     .___         FROM       JOIN
 *    /    \          |       /    \
 *   a  city_name  people  address ON
 *                                  |
 *                                  =___________
 *                                 /            \
 *                                .____          .
 *                               /     \        / \
 *                               p  address_id  a  id
 *
 */

export default function drawTree(tree, _getTitle, _getNodes) {
	var whitespace = ' ',
		output = [];

	var getTitle = _getTitle || function (node) {
			return (typeof node === 'string') ? node : node[0];
		};

	var getNodes = _getNodes || function (node) {
			return (typeof node === 'string') ? null : node[1];
		};

	var checkEmpty = function (onLine) {
		if (output[onLine] == undefined) {
			output[onLine] = '';
		}
	};

	var repeat = function (string, times) {
		var output = '';
		for (var i = 0; i < times; i++) {
			output += string;
		}
		return output;
	};

	var findPadding = function (string, onLine, position, _margin) {
		checkEmpty(onLine);

		var padding = 0,
			margin = _margin != undefined ? _margin : 2,
			length = output[onLine].length;

		if (position < 0) {
			padding = -position;
			position = 0;
		}

		if (length >= position) {
			padding += length - position + margin;
		}

		return padding;
	};

	var insert = function (string, onLine, position) {
		checkEmpty(onLine);

		var length = output[onLine].length;

		if (position < 0) {
			throw "Trying to insert \"" + string + "\" at negative position(" + position + ").";
		}

		if (position < length) {
			throw "Trying to insert \"" + string + "\" at position(" + position + ") less then length(" + length + ").";
		}

		output[onLine] += repeat(whitespace, position - length) + string;
	};

	var drawNode = function (tree, onLine, position) {
		var padding = 0,
			foundedPadding = 0,
			nodePadding = 0,
			node, title,
			offset = 0,
			currentTitle = getTitle(tree),
			nodes = getNodes(tree);

		if (nodes) {
			var at = position;
			if (nodes.length == 1) {
				node = nodes[0];
				title = getTitle(node);

				var halfOfCurrentTitle = Math.floor(currentTitle.length / 2);
				offset = Math.floor(title.length / 2) - halfOfCurrentTitle;

				foundedPadding = findPadding(title, onLine + 2, position - offset);

				nodePadding = drawNode(node, onLine + 2, position - offset + foundedPadding);
				insert('|', onLine + 1, position + halfOfCurrentTitle + foundedPadding + nodePadding);

				padding = foundedPadding + nodePadding;
			} else {
				for (var i = 0; i < nodes.length; i++) {
					node = nodes[i];
					title = getTitle(node);

					if (i == 0) {
						offset = title.length == 1 ? 2 : Math.floor(title.length / 2) + 1;

						foundedPadding = findPadding(title, onLine + 2, position - offset);
						nodePadding = drawNode(node, onLine + 2, position - offset + foundedPadding);
						insert('/', onLine + 1, position - 1 + foundedPadding + nodePadding);
						insert(repeat(whitespace, currentTitle.length), onLine + 1, position + foundedPadding + nodePadding);
						padding = foundedPadding + nodePadding;
						at += padding + currentTitle.length;
					} else {
						offset = title.length == 1 ? -1 : Math.floor(title.length / 2) - 1;

						foundedPadding = findPadding(title, onLine + 2, at - offset);
						nodePadding = drawNode(node, onLine + 2, at - offset + foundedPadding);
						at += foundedPadding + nodePadding;
						insert('\\', onLine + 1, at);
						currentTitle += repeat('_', foundedPadding + nodePadding);
					}

				}
			}
		}
		insert(currentTitle, onLine, position + padding);
		return padding;
	};

	drawNode(tree, 0, 0);

	return output.join("\n");
}
