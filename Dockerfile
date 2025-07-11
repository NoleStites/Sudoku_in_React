# Use official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire codebase (adjust as needed)
COPY . .

# Expose Flask port
EXPOSE 5000

# Run your Flask app
CMD ["python", "src/sudoku_code/Sudoku.py"]

