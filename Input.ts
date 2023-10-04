export class Input {
	get current(): string | undefined {
		return this.range[1] > this.index ? this.data[this.index] : undefined
	}
	get isWhitespace(): boolean {
		const c = this.current
		return (
			c === " " ||
			c === "\n" ||
			c === "\t" ||
			c === "\r" ||
			c === "\f" ||
			c === "\v" ||
			c === "\u00a0" ||
			c === "\u1680" ||
			c === "\u2000" ||
			c === "\u200a" ||
			c === "\u2028" ||
			c === "\u2029" ||
			c === "\u202f" ||
			c === "\u205f" ||
			c === "\u3000" ||
			c === "\ufeff"
		)
	}
	get isNewLine(): boolean {
		const c = this.current
		return c === "\n" || c === "\r" || c === "\f" || c === "\v"
	}
	private constructor(
		private readonly data: string,
		private index = 0,
		private range: [number, number] = [0, data.length]
	) {}
	peek(count: number): string | undefined {
		return count < 0 ? undefined : this.data.substring(this.index, Math.min(this.index + count, this.range[1]))
	}
	read(count = 1): string | undefined {
		const result = this.peek(count)
		this.index += result?.length ?? 0
		return result
	}
	startsWith(needle: string): boolean {
		return this.peek(needle.length) == needle
	}
	readWhile(predicate: (me: Input) => boolean): Input {
		const range: [number, number] = [this.index, this.index]
		while (this.range[1] > this.index && predicate(this))
			range[1] = ++this.index
		return new Input(this.data, range[0], range)
	}
	readUntil(needle: string | ((me: Input) => boolean)): Input {
		return this.readWhile(typeof needle == "string" ? me => !me.startsWith(needle) : needle)
	}
	readUntilWhitespace(): Input {
		return this.readWhile(me => !me.isWhitespace)
	}
	readWhileWhitespace(): Input {
		return this.readWhile(me => me.isWhitespace)
	}
	readIf(needle: string): boolean {
		return !!(this.startsWith(needle) && (this.index += needle.length))
	}
	readLine(): Input {
		return this.readWhile(me => !me.isNewLine)
	}
	split(separator: string): Input[] {
		const result: Input[] = []
		let start = this.index
		do {
			if (this.startsWith(separator)) {
				result.push(new Input(this.data, start, [start, this.index]))
				this.read(separator.length)
				start = this.index
			}
		} while (this.read())
		result.push(new Input(this.data, start, [start, this.index]))
		return result
	}
	clone(): Input {
		return new Input(this.data, this.index, this.range)
	}
	toString(): string {
		return this.data.substring(this.index, this.range[1])
	}
	toInteger(): number {
		return Number.parseInt(this.toString())
	}
	toFloat(): number {
		return Number.parseFloat(this.toString())
	}
	static create(data: string): Input {
		return new Input(data)
	}
}
