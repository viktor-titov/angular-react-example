container_name=angular-react-example

run:
	docker build -t angular-react-example .
	docker run --name $(container_name) -d -p 8080:80 angular-react-example

stop:
	docker stop $(container_name)
	docker rm $(container_name)

update: stop run
	