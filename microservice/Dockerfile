FROM python:3.11-slim

# Create a non-root user for security
RUN useradd -m -s /bin/bash quantum_user

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY main.py .

# Change ownership to the non-root user
RUN chown -R quantum_user:quantum_user /app

# Switch to the non-root user
USER quantum_user

# Expose port
EXPOSE 8000

# Run FastAPI using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
